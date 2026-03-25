import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
from decouple import config

class AIChatView(APIView):
    def post(self, request):
        import sys
        import traceback
        print("AIChatView POST received", flush=True)
        user_message = request.data.get("message")
        if not user_message:
            return Response({"error": "Message is required"}, status=status.HTTP_400_BAD_REQUEST)

        api_key = os.getenv("OPENAI_API_KEY") or config("OPENAI_API_KEY", default=None)
        if not api_key:
            print("ERROR: OpenAI API Key not configured")
            return Response({"error": "OpenAI API Key not configured"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            print(f"Calling OpenAI with key: {api_key[:5]}...", flush=True)
            llm = ChatOpenAI(openai_api_key=api_key, model="gpt-3.5-turbo")
            response = llm.invoke([HumanMessage(content=user_message)])
            return Response({"reply": response.content}, status=status.HTTP_200_OK)
        except Exception as e:
            trace = traceback.format_exc()
            print(f"EXCEPTION in AIChatView:\n{trace}", flush=True)
            return Response({"error": str(e), "traceback": trace}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)