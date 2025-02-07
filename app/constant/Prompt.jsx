import dedent from "dedent";

export default {
  IDEA: dedent`
    As a coaching teacher:
    - The user wants to learn about a topic.
    - Generate 5-7 short course titles related to the topic.
    - Ensure the titles are relevant to the description provided by the user.
    - Output must be in valid JSON format as follows:
    \`\`\`json
    {
      "course_titles": ["Course 1", "Course 2", "Course 3", "Course 4", "Course 5", "Course 6", "Course 7"]
    }
    \`\`\`
    - Do not include any extra text, explanations, or formatting outside this JSON object.
  `,

  COURSE: dedent`
    :: As you are a coaching teacher
    - User wants to learn about all topics
    - Create 2 Courses with Course Name, Description, and 3 Chapters in each course
    - Ensure each course has a detailed learning structure
    - Assign a Course Banner Image from ('/banner1.png', '/banner2.png', '/banner3.png', '/banner4.png')
    - Explain the chapter content as a detailed tutorial
    - Generate 5 Quizzes, 10 Flashcards, and 5 Questions & Answers
    - Output should be in JSON Format only

    \`\`\`json
    {
      "courses": [
        {
          "courseTitle": "<Intro to Python>",
          "description": "<Course description>",
          "banner_image": "/banner1.png",
          "chapters": [
            {
              "chapterName": "<Chapter 1 Name>",
              "content": [
                {
                  "topic": "<Topic Name (2-4 words, e.g., Variables in Python)>",
                  "explain": "<Detailed Explanation>",
                  "code": "<Code example if required, else null>",
                  "example": "<Example if required, else null>"
                }
              ]
            },
            {
              "chapterName": "<Chapter 2 Name>",
              "content": [
                {
                  "topic": "<Topic Name>",
                  "explain": "<Detailed Explanation>",
                  "code": "<Code example if required, else null>",
                  "example": "<Example if required, else null>"
                }
              ]
            },
            {
              "chapterName": "<Chapter 3 Name>",
              "content": [
                {
                  "topic": "<Topic Name>",
                  "explain": "<Detailed Explanation>",
                  "code": "<Code example if required, else null>",
                  "example": "<Example if required, else null>"
                }
              ]
            }
          ],
          "quiz": [
            {
              "question": "<Question>",
              "options": ["a", "b", "c", "d"],
              "correctAns": "<Correct Answer>"
            }
          ],
          "flashcards": [
            {
              "front": "<Front of the Flashcard>",
              "back": "<Back of the Flashcard>"
            }
          ]
        },
        {
          "courseTitle": "<Another Course Title>",
          "description": "<Course description>",
          "banner_image": "/banner2.png",
          "chapters": [
            {
              "chapterName": "<Chapter 1 Name>",
              "content": [
                {
                  "topic": "<Topic Name>",
                  "explain": "<Detailed Explanation>",
                  "code": "<Code example if required, else null>",
                  "example": "<Example if required, else null>"
                }
              ]
            },
            {
              "chapterName": "<Chapter 2 Name>",
              "content": [
                {
                  "topic": "<Topic Name>",
                  "explain": "<Detailed Explanation>",
                  "code": "<Code example if required, else null>",
                  "example": "<Example if required, else null>"
                }
              ]
            },
            {
              "chapterName": "<Chapter 3 Name>",
              "content": [
                {
                  "topic": "<Topic Name>",
                  "explain": "<Detailed Explanation>",
                  "code": "<Code example if required, else null>",
                  "example": "<Example if required, else null>"
                }
              ]
            }
          ],
          "quiz": [
            {
              "question": "<Question>",
              "options": ["a", "b", "c", "d"],
              "correctAns": "<Correct Answer>"
            }
          ],
          "flashcards": [
            {
              "front": "<Front of the Flashcard>",
              "back": "<Back of the Flashcard>"
            }
          ]
        }
      ]
    }
    \`\`\`
  `
};
