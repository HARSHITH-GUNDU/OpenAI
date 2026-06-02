Setup Steps
1. Clone the repo and install backend dependencies

cd Backend

pip install flask python-dotenv pip-system-certs openai flask-cors

3. Set your OpenAI API key

Create a file Backend/.env:


OPENAI_API_KEY=your_key_here

3. Install frontend dependencies

cd frontend

npm install

5. Run the backend (in one terminal)
cd Backend
python app.py

It will start on http://localhost:8000

5. Run the frontend (in another terminal)
cd frontend
npm start

It will open http://localhost:3000 in your browser automatically.
