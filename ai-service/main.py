from fastapi import FastAPI
from pydantic import BaseModel

# Create the FastAPI app
app = FastAPI()

# Pydantic Model: Defines the data schema
# Django sends exact data
class StudentData(BaseModel):
    name: str
    student_class: str
    age: int

    
# Endpoint Django will talk to
@app.post('/generate-report/')
def generate_report(data: StudentData):
    
    if data.age >= 16:
        report = f"Hello {data.name}. As a {data.age}-year-old in {data.student_class}, you are in a crucial year. Focus on advanced topics and preparing for exams."
    else:
        report = f"Hello {data.name}. At {data.age} years old in {data.student_class}, focus on building strong fundamentals and enjoying your learning journey!"
      
    # Return the report as JSON  
    return {
        'report': report
    }