import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
from decouple import config

class AIChatView(APIView):
    def post(self, request):
        user_message = request.data.get("message")
        if not user_message:
            return Response({"error": "Message is required"}, status=status.HTTP_400_BAD_REQUEST)

        from django.conf import settings
        
        # Priority: settings.py > env > decouple config
        api_key = getattr(settings, "OPENAI_API_KEY", None)
        if not api_key:
            api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            api_key = config("OPENAI_API_KEY", default=None)
        
        if not api_key:
            return Response({"error": "OpenAI API Key not configured. Please add OPENAI_API_KEY to your settings.py or .env file."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            llm = ChatOpenAI(openai_api_key=api_key, model="gpt-3.5-turbo")
            response = llm.invoke([HumanMessage(content=user_message)])
            return Response({"reply": response.content}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)