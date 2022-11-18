from collections import Counter
import random 
import pandas as pd
import numpy as np
# data from database 
# data structure
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

# def get_target_task(data):
    #       task1     task2 task3 
    # uid1  duration
    # uid2


# done final dataframe
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

for user in user_task_list:
    uid = user[0]
    # print(uid)
    for i in range(len(user)):# no. of task

        user[1][i].append(duration)
        print(user[1][i])


# def get_duration_for_task(data):



# # calculate the weekly workload of user
# # given list of user's weekly task estimated duration with the no. of collaborator of each task 
# # [[task id, [no of collaborator, taskStartedDays, estimateDuration]],[task id, task duration, no of collaborator, taskStartedDays]]

# # [[task id, [task duration, no of collaborator, taskStartedDays]],[task id, task duration, no of collaborator, taskStartedDays]]

# fake = []
# task = []
# for i in range(1,10):
#     # t=random.randint(3,10)
#     y=random.randint(1,4)
#     for j in range(1,y):
#         t1=random.randint(5,15)
#         t2=random.randint(1,4)
#         t3=random.randint(0,4)
#         task.append([t1,t2,t3])
    
#     fake.append([i, task])
#     # fake.append(task)
#     task=[]

        
# # to calculate the estimated workload

# #[1, [[7, 3], [4, 3], [6, 4]], 2, [[8, 1]], 3, [[8, 3], [10, 4], [4, 3]], 4, [], 5, [[4, 2], [6, 3]], 6, [[9, 2], [3, 4]], 7, [[9, 3], [8, 1]], 8, [[9, 1]], 9, [[4, 3], [10, 4]]]
# workload = []

# for i in range(len(fake)):#len(fake) = no of user
#     taskNo=len(fake[i][1])#no of task 
#     # 繁忙程度 = this week estimation of workload/7
#     # this week estimation of workload = sum of each task work load(task duratoin /no of collaborator )
   
    
#     # print("fake[1][i]: ", fake[1][i])
#     print('taskNo:', taskNo)
#     sumTaskCost=0
#     for j in range(len(fake[i][1])):
#         print("fake[i][1][j]: ", fake[i][1][j])
#         taskCost = fake[i][1][j][0]/fake[i][1][j][1] - fake[i][1][j][2] # estimated duration deduct the no. of day passed
#         print("taskCost: ", taskCost)
#         sumTaskCost+=taskCost
#     print("sumTaskCost: ", sumTaskCost)
#     # sumTaskCost is the over all duration of all task aasigned to
#     busy=sumTaskCost/7
#     workload.append([fake[i][0],int(busy*100)])#need to add %


# print("fake: ", fake)
# print("workload: ", workload)

doc_ref = db.collection(u"tasks")
    tasks = []
    docs = await doc_ref.get()
    for doc in docs:
        item = doc.to_dict()
        item["cost"] = 0
        item["id"] = doc.id
        tasks.append(item)
        if item["status"] == "Completed":
            timestamp = item["completeDate"].timestamp() - item["createdAt"].timestamp()
            item["cost"] = round((timestamp)/3600/24,2)
    doc_ref = db.collection(u"taskcollaborators")
    collabs = []
    docs = await doc_ref.get()
    for doc in docs:
        item = doc.to_dict()
        collabs.append(item)
    
    data = []
    for t in tasks:
        users = [v["userId"] for k,v in collabs.items() if v["taskId"] == t["id"]]
        t["collaborators"] = users
        data.append