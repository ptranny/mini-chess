## Running the code
The code is in a folder called mini-chess on the shared server.

To run it you'll need to right-click on index.html in VS Code and select 'Open With Live Server'. This will load the modules properly.

## Questions to think about...
- Which part of the code is manipulating the DOM?
- Which part of the code is NOT manipulating the DOM?
- Are these parts kept separate or are they mixed together?
- Where is the 'source of truth' for the state of the game? Is it in the DOM or in the model? 
  - For example, if you want to know where the pieces are on the board, would you query the DOM or query the model?
  - Which is easier?
- The render() function in view.js is reading some state from the game object and rendering it to the screen. What does this remind you of?
- Where would you modify the code to do the following things:
  - change the size of the board
  - change the starting position of the pieces
  - add more types of pieces
  - add movement rules for pieces
- Did you have to change the code in many places to change the game? Which parts didn't have to be changed at all?
- What might be the advantage of separating the code into these bits called model, view, and controller?
- Can you describe what these three parts do? 
- If you were converting this to React, which parts of the code would be replaced by React and which parts would be kept the same?
- Could you apply the MVC pattern to other projects?