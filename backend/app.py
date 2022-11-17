import datetime
from flask import Flask

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

    return data


if __name__ == '__main__':
    app.run()
