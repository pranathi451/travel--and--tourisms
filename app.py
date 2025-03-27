from flask import Flask, render_template, request, jsonify

app = Flask(__name__, template_folder="templates", static_folder="static")

# Homepage with splash screens and main layout
@app.route("/")
def home():
    return render_template("index.html")

# Destinations page route (you can expand this with dynamic category handling)
@app.route("/destinations")
def destinations():
    return render_template("destinations.html")

# Dynamic route for a specific destination category (example: forts, forests, etc.)
@app.route("/destinations/<category>")
def destination_category(category):
    # In a real app, you could look up the category in a database
    # For now, we simply render a static page or a template named after the category
    template_name = f"destinations/{category}.html"
    return render_template(template_name)

# Search API route (placeholder for dynamic search results)
@app.route("/search")
def search():
    query = request.args.get("q", "").lower()
    # Placeholder: In a real app, implement lookup logic based on query
    sample_results = [
        {"name": "Fort of Agra", "url": "/destinations/fort"},
        {"name": "Mystic Forest", "url": "/destinations/forest"},
        {"name": "Ancient Temple", "url": "/destinations/temple"}
    ]
    results = [item for item in sample_results if query in item["name"].lower()]
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)