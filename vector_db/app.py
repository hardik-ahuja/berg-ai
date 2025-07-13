from flask import Flask, request, jsonify
from vector_db import VectorDB
import numpy as np

app = Flask(__name__)
db = VectorDB()

@app.route('/insert', methods=['POST'])
def insert():
    data = request.json
    vectors = [d['embedding'] for d in data]
    metas = data
    db.batch_insert(vectors, metas)
    return jsonify({'count': len(data)})

@app.route('/search', methods=['POST'])
def search():
    query = np.array(request.json['vector']).reshape(1, -1)
    top_k = int(request.json.get('top_k', 3))
    results = db.search(query, top_k)
    return jsonify(results)

if __name__ == '__main__':
    app.run(port=5001)
