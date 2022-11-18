import random 
import pandas as pd
import numpy as np
# recommender system of user base collaborative filtering
# assuming similar user will have same performace
# define user type to be userId
# task type to be taskTag + taskState + taskInterval(deadline)
#Create dataframe with task type and user type 

# # fake data 1
# taskId = [i for i in range(1,101)]
# print('taskId: ' ,taskId, '\n')

# # total 20 users
# userId = []
# # 0=not started, 1=in progress, 2=blocked, 3=completed
# taskState = []
# taskInterval=[]
# taskActualtime=[]
# noCollaborator = []
# #甬道
# taskTag = []
# taskKind = ['UI design','database', 'testing','servers','component']


# # 实际时间 > 计划时间 == complete
# # 实际时间 = 0 == not started
# #  实际时间 < 计划时间
# for i in range(0,100):
#     state = random.randint(1,3)
#     Interval = random.randint(1,30)
#     Time = random.randint(-5,5)
#     no = random.randint(1,5)
#     index = random.randint(0,4)
#     Id = random.randint(1,20)
    
#     userId.append(Id)
#     taskTag.append(taskKind[index])
#     taskInterval.append(Interval)
#     noCollaborator.append(no)
    
#     if Interval + Time == 0:
#         taskState.append(0)
#         taskActualtime.append(Interval+Time)
#     else:
#         taskState.append(state)
#         taskActualtime.append(Interval+Time)
        
# print('taskId: ', taskId, '\n')  
# print('userId: ', userId, '\n')  
# print('taskTag: ', taskTag, '\n')    
# print('taskState: ', taskState, '\n')
# print('taskInterval: ', taskInterval, '\n')
# print('taskActualtime: ', taskActualtime, '\n')
# print('noCollaborator: ', noCollaborator, '\n')

# data = {'taskId':taskId,
#         'userId':userId,
#         'taskTag':taskTag,
#         'taskState':taskState,
#         'taskInterval':taskInterval,
#         'taskActualtime':taskActualtime,
        
#        }
# df = pd.DataFrame(data)
# df['taskType'] =  df['taskTag']+ "-" + df['taskState'].astype(str) 

# ##########################################
# print(len(df['userId'].unique()))
# duration_df = pd.DataFrame(np.random.randint(1,15,size=(len(df['taskType'].unique()),len(df['userId'].unique()))), columns = df['userId'].unique(), index = df['taskType'].unique())
# # duration_df
# print("duration_df: \n", duration_df)

# # #insert random na for estimation
# for col in duration_df.columns:
#     duration_df.loc[duration_df.sample(frac=0.1).index, col] = np.nan
# print("na_duraiont_df: /n", duration_df)

###############
data = [{"tasks":[{
                "assessment": "Perfect",
                "completeDate": "Fri, 03 Feb 2023 06:45:22 GMT",
                "cost": 0,
                "cover": {
                    "downloadURL": "",
                    "storagePath": ""
                },
                "createdAt": "Wed, 16 Nov 2022 21:30:14 GMT",
                "createdBy": "ToLZAJh4yCSwVjTss08NcMJbhCG2",
                "description": "Eos magnam reprehenderit natus dicta velit voluptatibus.",
                "dueDate": "Fri, 05 May 2023 17:53:52 GMT",
                "id": "5e460a59b6086ddfb6a8",
                "laneId": "c465b9aa5e5e460a59b6",
                "projectId": "27c702bf770a4bcbeb07",
                "status": "Not Started",
                "title": "Corporate Data Officer"
            },{
                "assessment": "Perfect",
                "completeDate": "Thu, 19 Oct 2023 18:42:30 GMT",
                "cost": 11,
                "cover": {
                    "downloadURL": "",
                    "storagePath": ""
                },
                "createdAt": "Thu, 17 Nov 2022 00:02:50 GMT",
                "createdBy": "8LF1YpzKi1McVMVM5wU9tHoOkYO2",
                "description": "Distinctio inventore perferendis a.",
                "dueDate": "Sat, 29 Apr 2023 00:41:21 GMT",
                "id": "64998104224d2b5b8b0a3",
                "laneId": "993d664998104224d2b5",
                "projectId": "8cbc59fa5fd80bb2280e",
                "status": "In Progress",
                "title": "Forward Accountability Officer"

            },{
                "assessment": "Perfect",
                "completeDate": "Thu, 19 Oct 2023 18:42:30 GMT",
                "cost": 10,
                "cover": {
                    "downloadURL": "",
                    "storagePath": ""
                },
                "createdAt": "Thu, 17 Nov 2022 00:02:50 GMT",
                "createdBy": "8LF1YpzKi1McVMVM5wU9tHoOkYO2",
                "description": "Distinctio inventore perferendis a.",
                "dueDate": "Sat, 29 Apr 2023 00:41:21 GMT",
                "id": "64998104224d2b5b8b0a4",
                "laneId": "993d664998104224d2b5",
                "projectId": "8cbc59fa5fd80bb2280e",
                "status": "In Progress",
                "title": "Forward Accountability Officer"

            }], "uid":["uid1"]},
            {"tasks":[{
                "assessment": "Perfect",
                "completeDate": "Fri, 03 Feb 2023 06:45:22 GMT",
                "cost": 5,
                "cover": {
                    "downloadURL": "",
                    "storagePath": ""
                },
                "createdAt": "Wed, 16 Nov 2022 21:30:14 GMT",
                "createdBy": "ToLZAJh4yCSwVjTss08NcMJbhCG2",
                "description": "Eos magnam reprehenderit natus dicta velit voluptatibus.",
                "dueDate": "Fri, 05 May 2023 17:53:52 GMT",
                "id": "5e460a59b6086ddfb6a8",
                "laneId": "c465b9aa5e5e460a59b6",
                "projectId": "27c702bf770a4bcbeb07",
                "status": "Not Started",
                "title": "Corporate Data Officer"
            },{
                "assessment": "Perfect",
                "completeDate": "Thu, 19 Oct 2023 18:42:30 GMT",
                "cost": 1,
                "cover": {
                    "downloadURL": "",
                    "storagePath": ""
                },
                "createdAt": "Thu, 17 Nov 2022 00:02:50 GMT",
                "createdBy": "8LF1YpzKi1McVMVM5wU9tHoOkYO2",
                "description": "Distinctio inventore perferendis a.",
                "dueDate": "Sat, 29 Apr 2023 00:41:21 GMT",
                "id": "64998104224d2b5b8b0a1",
                "laneId": "993d664998104224d2b5",
                "projectId": "8cbc59fa5fd80bb2280e",
                "status": "In Progress",
                "title": "Forward Accountability Officer"

            },{
                "assessment": "Perfect",
                "completeDate": "Thu, 19 Oct 2023 18:42:30 GMT",
                "cost": 10,
                "cover": {
                    "downloadURL": "",
                    "storagePath": ""
                },
                "createdAt": "Thu, 17 Nov 2022 00:02:50 GMT",
                "createdBy": "8LF1YpzKi1McVMVM5wU9tHoOkYO2",
                "description": "Distinctio inventore perferendis a.",
                "dueDate": "Sat, 29 Apr 2023 00:41:21 GMT",
                "id": "64998104224d2b5b8b0a2",
                "laneId": "993d664998104224d2b5",
                "projectId": "8cbc59fa5fd80bb2280e",
                "status": "In Progress",
                "title": "Forward Accountability"

            }], "uid":["uid2"]}]

# output data structure dataframe, user id and task:title


def get_mean_cost_of_task(dict):
    
    # userList.append(dict.get("uid"))
    # print(dict.get(""))
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

print(get_dataframe(data))
duration_df=get_dataframe(data)

# def get_target_task(data):
    #       task1     task2 task3 
    # uid1  duration
    # uid2


# done final dataframe





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
print('similarity_df: /n', similarity_df)

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



#final result
full_durations = duration_df.copy()

for user, duration in full_durations.iteritems():
    for cost in duration.keys():
        if np.isnan(full_durations.loc[cost, user]):
            full_durations.loc[cost, user] = predict_duration(
                duration_df, similarity_df, user, cost
            )
# output the estimated task duration for each type of task 
print("full_duration:\n", full_durations)
print(full_durations.index)

# # input:[[userId, [[taskId, taskType, no of collaborator, taskStartedDays],[taskId, taskType],[taskId, taskType]]],[userId, [taskId, taskType]],[userId, [taskId, taskType]]]
# input = []
# taskList=[]
# for i in range(1,8):
#     no_of_task = random.randint(1, 5)
#     for j in range(1, no_of_task):
#         taskType = random.randint(0, len(full_durations.index)-1)
#         no_of_collaborator = random.randint(1,4)
#         taskStartedDays = random.randint(0,3)

#         taskList.append([str(i)+"_"+str(j), full_durations.index[taskType], no_of_collaborator,taskStartedDays ])
#     input.append([i,taskList])
#     taskList=[]

# print(input)
# # get the duration for each task of one user
# for user in range(len(input)):
#     for task in range(len(input[user][1])):#task list
#         print(input[user][1][task])
#         print("gggggggg", input[user][1][task][1])
#         print("user id: ", input[user][0])
#         duration=full_durations[full_durations.index == input[user][1][task][1]]. input[user][0]
#         #todo:提取dataframe里的数据
#         print(duration)
#         # input[user][1][task].append(int(duration))
# # print(input)


# output: [[task id, [no of collaborator, taskStartedDays, estimateDuration]],[task id, task duration, no of collaborator, taskStartedDays]]


#TODO 把dataframe立的数据提取出来 返回给老板 [userid, ]



def get_user_task_list(data):
    userList=[]
    for user in data:
        taskList = []
        for task in user.get('tasks'):
            taskList.append([task.get('id'),task.get('title'), task.get('createdAt'), random.randint(1,4)])#TODO 找老板要no of collaborator
        userList.append([user.get('uid')[0],taskList])
    return userList

print(get_user_task_list(data))

user_task_list = get_user_task_list(data)



def get_duration_for_task(data):
    user_task_list = get_user_task_list(data)
    for user in user_task_list:
        uid = user[0]
        # print(uid)
        for i in range(len(user)+1):# no. of task
            duration = full_durations._get_value(user[1][i][1], uid)
            if duration:
                user[1][i].append(duration)
                print(duration)
            else:
                # print("-----------")
                user[1][i].append(1)
            print(user[1][i])
    return user_task_list

fake=get_duration_for_task(data)
print(fake)


workload = []

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

print(get_workload(fake))

#     # 繁忙程度 = this week estimation of workload/7
#     # this week estimation of workload = sum of each task work load(task duratoin /no of collaborator )
   
    
#     # print("fake[1][i]: ", fake[1][i])
#     # print('taskNo:', taskNo)
#     sumTaskCost=0
#     for j in range(len(fake[i][1])):
#         print("fake[i][1][j]: ",fake[i][1][j], fake[i][1][j][-2],fake[i][1][j][-1])
#         taskCost = fake[i][1][j][-1]/fake[i][1][j][-2] # TODO estimated duration deduct the no. of day passed
#         # print("taskCost: ", taskCost)
#         sumTaskCost+=taskCost
#     print("sumTaskCost: ", sumTaskCost)
#     # sumTaskCost is the over all duration of all task aasigned to
#     busy=sumTaskCost/7
#     workload.append([fake[i][0],int(busy*100)])#need to add %


print(workload)
