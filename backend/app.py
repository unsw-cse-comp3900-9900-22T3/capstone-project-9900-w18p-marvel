import datetime
from flask import Flask
from collections import Counter
import random 
import pandas as pd
import numpy as np

app = Flask(__name__)

import firebase_admin
from firebase_admin import credentials,firestore_async

cred = credentials.Certificate("./theverypulseofthemachine-firebase-adminsdk-qnurl-42b20ec79c.json")
client = firebase_admin.initialize_app(cred, {
    'databaseURL': "https://theverypulseofthemachine-default-rtdb.asia-southeast1.firebasedatabase.app",
    'databaseAuthVariableOverride': {
        'uid': 'my-service-worker'
    }
})
db = firestore_async.client()

@app.route('/recommend')
async def recommend():
    print("xxxxxxxx")
    doc_ref = db.collection(u"users")
    users = []
    docs = await doc_ref.get()
    for doc in docs:
        item = doc.to_dict()
        item["uid"] = doc.id
        users.append(item)
    data = []
    for u in users:
        d = {"uid":u["uid"],"tasks":[]}
        task_ref = db.collection(u'taskcollaborators').where("userId","==",u["uid"])
        task_docs = await task_ref.get()
        for doc in task_docs:
            task = await db.collection("tasks").document(doc.to_dict()["taskId"]).get()
            if task.exists:
                item = task.to_dict()
                item["cost"] = 0
                item['id'] = task.id
                if item["status"] == "Completed":
                    timestamp = item["completeDate"].timestamp() - item["createdAt"].timestamp()
                    item["cost"] = round((timestamp)/3600/24,2)
                d['tasks'].append(item)
        data.append(d)

#########################start#################################
        def get_mean_cost_of_task(dict):
            df = pd.DataFrame(dict.get("tasks"))
            df1= df.groupby(['title']).mean()
            uid= dict.get("uid")[0]
            print(uid)
            df2=df1.rename(columns={'cost': uid})
            return df2
        def get_dataframe(data):   
            list = []
            for dict in data:   
                # print(get_mean_cost_of_task(dict))
                temp = get_mean_cost_of_task(dict)
                list.append(temp)
            final = pd.concat(list, axis=1)
            return final
        

        duration_df = get_dataframe(data)
############## recommender system #################
        # step 1 find similarity between two users

        def find_correlation_between_two_users(duration_df: pd.DataFrame, user1: str, user2: str):
            """Find correlation between two users using Pearson correlation"""
            task_type_done_by_both_users = duration_df[[user1, user2]].dropna(axis=0).values
            user1_duration = task_type_done_by_both_users[:, 0]
            user2_duration = task_type_done_by_both_users[:, 1]
            return np.corrcoef(user1_duration, user2_duration)[0, 1]
        # step 2 find similarity acrosss all user

        users = list(duration_df.columns)
        durations = list(duration_df.index)
        similarity_matrix = np.array([[find_correlation_between_two_users(duration_df, user1, user2) for user1 in users] for user2 in users])
        similarity_df = pd.DataFrame(similarity_matrix, columns=users, index=users)
        # print('similarity_df: /n', similarity_df)

        # step 3 get similar user, i.e. we want to predict the actual time for a task
        def gget_user_for_a_task_type(duration_df: pd.DataFrame, task: str):
            return duration_df.loc[task, :].dropna().index.values

        # step 4 get top k number of user 
        def get_top_neighbors(similarity_df: pd.DataFrame, user: str, completed_users: str, n_neighbors: int):
            return similarity_df[user][completed_users].nlargest(n_neighbors).to_dict()

        # step 5 get duration of similar user on same task 
        def subtract_bias(duration: float, mean_duration: float):
            return duration - mean_duration


        def get_neighbor_duration_without_bias_per_task(
            duration_df: pd.DataFrame, user: str, task: str
        ):
            """Substract the duration of a user from the mean duration of that user to eliminate bias"""
            mean_duration = duration_df[user].mean()
            duration = duration_df.loc[task, user]
            return subtract_bias(duration, mean_duration)
            
        def get_durations_of_neighbors(duration_df: pd.DataFrame, neighbors: list, task: str):
            """Get the durations of all neighbors after adjusting for biases"""
            return [
                get_neighbor_duration_without_bias_per_task(duration_df, neighbor, task)
                for neighbor in neighbors
            ]

        def get_weighted_average_duration_of_neighbors(durations: list, neighbor_distance: list):
            weighted_sum = np.array(durations).dot(np.array(neighbor_distance))
            abs_neigbor_distance = np.abs(neighbor_distance)
            return weighted_sum / np.sum(abs_neigbor_distance)


        def ger_user_duration(duration_df: pd.DataFrame, user: str, avg_neighbor_duration: float):
            user_avg_duration = duration_df[user].mean()
            return int(user_avg_duration + avg_neighbor_duration)

        def predict_duration(
            df: pd.DataFrame,
            similarity_df: pd.DataFrame,
            user: str,
            task: str,
            n_neighbors: int = 2,
        ):
            """Predict the duration of a user for a task based on the durations of neighbors"""
            duration_df = df.copy()

            completed_users = gget_user_for_a_task_type(duration_df, task)

            top_neighbors_distance = get_top_neighbors(
                similarity_df, user, completed_users, n_neighbors
            )
            neighbors, distance = top_neighbors_distance.keys(), top_neighbors_distance.values()

            print(f"Top {n_neighbors} neighbors of user {user}, {task}: {list(neighbors)}")

            durations = get_durations_of_neighbors(duration_df, neighbors, task)
            avg_neighbor_duration = get_weighted_average_duration_of_neighbors(
                durations, list(distance)
            )

            return ger_user_duration(duration_df, user, avg_neighbor_duration)
        def get_user_task_list(data):
            userList=[]
            for user in data:
                taskList = []
                for task in user.get('tasks'):
                    taskList.append([task.get('id'),task.get('title'), task.get('createdAt'), random.randint(1,4)])#TODO 找老板要no of collaborator
                userList.append([user.get('uid')[0],taskList])
            return userList

        def get_duration_for_task(data):
            user_task_list = get_user_task_list(data)
            for user in user_task_list:
                uid = user[0]
                # print(uid)
                for i in range(len(user)):# no. of task
                    duration = full_durations._get_value(user[1][i][1], uid)
                    user[1][i].append(duration)
                    print(user[1][i])
            return user_task_list

        def get_workload(fake):
            workload = []
            for i in range(len(fake)):#len(fake) = no of user
                
                taskNo=len(fake[i][1])#no of task 
                # print(fake[i][1],"\n")
                # print(taskNo,"\n")
                sumTaskCost=0
                for task in range(taskNo):
                    taskCost = fake[i][1][task][-1]/fake[i][1][task][-2]
                    sumTaskCost+=taskCost
                busy=sumTaskCost/7
                workload.append([fake[i][0],int(busy*100)])#need to add %
            return workload


        full_durations = duration_df.copy()

        for user, duration in full_durations.iteritems():
            for cost in duration.keys():
                if np.isnan(full_durations.loc[cost, user]):
                    full_durations.loc[cost, user] = predict_duration(
                        duration_df, similarity_df, user, cost
                    )    

        fake=get_duration_for_task(data)
        result = get_workload(fake)
                        
    return data



if __name__ == '__main__':
    app.run()
