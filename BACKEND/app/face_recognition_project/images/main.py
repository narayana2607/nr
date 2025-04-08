import cv2
import face_recognition
import numpy as np
import os

# Load reference images and encode them
def load_reference_images(directory):
    known_face_encodings = []
    known_face_names = []

    for file_name in os.listdir(directory):
        if file_name.endswith(('.jpg', '.png')):
            # Load the image
            image_path = os.path.join(directory, file_name)
            image = face_recognition.load_image_file(image_path)
            encoding = face_recognition.face_encodings(image)[0]  # Encode the face

            # Add the encoding and name
            known_face_encodings.append(encoding)
            known_face_names.append(file_name.split('.')[0])  # Use file name as name

    return known_face_encodings, known_face_names


# Initialize video capture (webcam)
video_capture = cv2.VideoCapture(0)

# Load reference images
reference_directory = "./images"
known_face_encodings, known_face_names = load_reference_images(reference_directory)

# Initialize some variables
face_locations = []
face_encodings = []
face_names = []
process_frame = True

while True:
    # Grab a single frame of video
    ret, frame = video_capture.read()

    # Process every other frame for efficiency
    if process_frame:
        # Convert the frame from BGR (OpenCV) to RGB (face_recognition)
        rgb_frame = frame[:, :, ::-1]

        # Find all face locations and face encodings in the current frame
        face_locations = face_recognition.face_locations(rgb_frame)
        face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

        # Match faces to known faces
        face_names = []
        for face_encoding in face_encodings:
            # Compare the face with known faces
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding, tolerance=0.6)
            name = "Unknown"

            # Use the first match
            if True in matches:
                first_match_index = matches.index(True)
                name = known_face_names[first_match_index]

            face_names.append(name)

    process_frame = not process_frame

    # Display results
    for (top, right, bottom, left), name in zip(face_locations, face_names):
        # Draw a rectangle around the face
        cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)

        # Draw a label with the name below the face
        cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 255, 0), cv2.FILLED)
        font = cv2.FONT_HERSHEY_DUPLEX
        cv2.putText(frame, name, (left + 6, bottom - 6), font, 0.5, (255, 255, 255), 1)

    # Display the video
    cv2.imshow('Face Recognition', frame)

    # Break the loop with 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the webcam and close windows
video_capture.release()
cv2.destroyAllWindows()


print("main.py is running...")
