# Frontend Assignment - Real-Time Collaborative Whiteboard- Dendrite

## Problem Statement:
Create a web application using React that allows users to upload images and receive real-time predictions from a pre-
trained machine learning model. The application should be able to classify the uploaded images into multiple
categories.
# Minimum Requirements:

1. Users can create a new whiteboard session or join an existing one.
2. The whiteboard should support drawing using different colors and brush sizes.
3. Implement the ability to undo/redo the last action on the whiteboard.
4. Users should be able to see the cursors of other connected users moving in real-time, indicating their
drawing actions.
5. Add an option to save the whiteboard content as an image or PDF file.
6. Implement authentication (user signup and login) to ensure that only authorized users can access the
whiteboard.
7. The application should be responsive and work on both desktop and mobile devices.

## Must have:

1. Use React for front-end development.
2. The UX should look professional – see any white boarding tool from Microsoft for UX reference – bad
ux choices will have negative points
3. For real-time functionality, consider using WebSocket or a real-time database like PostGres SQL via a
docker container.
4. For drawing on the whiteboard, you can explore libraries like Fabric.js or Konva.js.
5. Implement secure authentication using a backend service of keycloak only. Please use keycloak via a
docker. User should only be allowed on home screen after login
6. Clean &amp; fluidic layout – use bootstrap (5.0) only
7. Code must be written in TypeScript only, no JS code will be accepted
8. Error-free, Readable, Simple &amp; Clean code
9. Let me stress the previous point - Readable, Simple &amp; Clean code

## Note about above Solution:
1. Uses Fabric.js
2. Uses Socket.io to achieve real time functionality.
