# from google import genai
# from django.conf import settings


# client = genai.Client(
#     api_key=settings.GEMINI_API_KEY
# )


# def analyze_symptoms(symptoms):

#     prompt = f"""
# You are a healthcare pre-consultation assistant for CareBridge.

# A patient has described these symptoms:

# {symptoms}

# Based ONLY on the symptoms provided, recommend the most appropriate
# medical specialization from the following options:

# - GENERAL
# - DERMATOLOGY
# - ENT
# - CARDIOLOGY
# - PEDIATRICS

# Return the response in this exact format:

# Specialization: <one specialization>
# Reason: <short explanation>
# Urgency: <LOW/MEDIUM/HIGH>

# Important:
# - Do not provide a definitive diagnosis.
# - Do not prescribe medication.
# - Clearly state that this is only a preliminary recommendation.
# - If symptoms suggest an emergency, recommend immediate medical attention.
# """

#     response = client.models.generate_content(
#         model="gemini-3.7-flash",
#         contents=prompt
#     )

#     return response.text

import time

from google import genai
from django.conf import settings


client = genai.Client(
    api_key=settings.GEMINI_API_KEY
)


def analyze_symptoms(symptoms):

    prompt = f"""
You are a healthcare pre-consultation assistant for CareBridge.

A patient has described these symptoms:

{symptoms}

Based ONLY on the symptoms provided, recommend the most appropriate
medical specialization from the following options:

- GENERAL
- DERMATOLOGY
- ENT
- CARDIOLOGY
- PEDIATRICS

Return the response in this exact format:

Specialization: <one specialization>
Reason: <short explanation>
Urgency: <LOW/MEDIUM/HIGH>

Important:
- Do not provide a definitive diagnosis.
- Do not prescribe medication.
- Clearly state that this is only a preliminary recommendation.
- If symptoms suggest an emergency, recommend immediate medical attention.
"""

    # models = [
    #     "gemini-3.7-flash",
    #     "gemini-2.5-flash",
    # ]
        
    models = [
    "gemini-3.7-flash",
    "gemini-3.6-flash",
]

    last_error = None

    for model in models:

        for attempt in range(2):

            try:

                response = client.models.generate_content(
                    model=model,
                    contents=prompt
                )

                if response.text:
                    return response.text

                raise Exception("Gemini returned an empty response.")

            except Exception as e:

                last_error = e

                # Retry temporary Gemini errors
                if "503" in str(e) or "UNAVAILABLE" in str(e):
                    time.sleep(2)
                    continue

                # Don't retry other errors
                raise

    raise last_error