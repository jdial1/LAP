# LAP
Both players secretly mark 4 regions of 16 squares each on their hidden 8x8 grid. 
Then they take turns asking about a given 2x2 section of the opponent's grid.
E.g. in the sample arrangement shown here, asking about "AB12" (the upper left corner) 
would receive an answer that "3 of the squares are in section I and 1 of the squares 
in section II" (or "1 1 1 2" for short). The answer does NOT indicate which square is 
which, only the number of squares which come from each of the 4 sections. 
(Thus I prefer to say the 4 squares in sorted order from lowest to highest.)

Eventually one of the players figures out the opponent's diagram and declares a win. 
Of course if it turns out the player is wrong, then the player loses!

The fact that each of the 4 regions has exactly 16 contiguous squares is of course crucial and helps you deduce things with a variety of types of reasoning as you get more information.

https://boardgamegeek.com/thread/712697/neat-puzzle-solving-game-only-needs-graph-paper-an




Socket IO Communication Route

client1 -> SEND_GUESS -> server

server -> GUESS -> client2

client2 -> CLIENT_GUESS_RESPONSE -> server

server -> SERVER_GUESS_RESPONSE -> client1

