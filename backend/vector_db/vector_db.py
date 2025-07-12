import numpy as np

class VectorDB:
    def __init__(self):
        self.vectors = []
        self.metadata = []

    def insert(self, vector, meta):
        self.vectors.append(vector)
        self.metadata.append(meta)
        return self.vectors

    def batch_insert(self, vectors, metas):
        self.vectors.extend(vectors)
        self.metadata.extend(metas)

    def search(self, query_vector, top_k=3):
        if not self.vectors:
            return []

        vectors_np = np.array(self.vectors)
        sims = np.dot(vectors_np, query_vector.T).squeeze()
        top_indices = sims.argsort()[::-1][:top_k]
        return [(self.metadata[i], sims[i]) for i in top_indices]