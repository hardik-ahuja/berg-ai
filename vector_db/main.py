# import json
# from embedder import Embedder
# from vector_db import VectorDB
# from generator import TextGenerator

# # Load data
# with open("documents.json", "r") as f:
#     docs = json.load(f)

# # Init components
# embedder = Embedder()
# db = VectorDB()
# generator = TextGenerator()

# # Embed and insert docs
# texts = [doc["data"] for doc in docs]
# metas = [{"id": doc["id"], "text": doc["data"]} for doc in docs]
# embeddings = embedder.embed(texts)
# db.batch_insert(embeddings, metas)

# # Sample query
# query = "Educational funding"
# query_vec = embedder.embed(query)
# results = db.search(query_vec, top_k=3)

# # Print results + generation
# print("Top results:")
# for meta, score in results:
#     print(f"[Score: {score:.3f}] {meta['text']}")

#     response = generator.generate(f"Context: {meta['text']}\nAnswer:")
#     print("Generated:", response, "\n")
