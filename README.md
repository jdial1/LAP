# LAP-Gridpaper-Game
LAP is a neat little paper and pencil puzzle game by Lech Pijanowski, a Polish game enthusiast who wrote a large book of various board games,
which was influential in its day and introduce many games to a wider audience in Poland. He also designed some games, including LAP: the title
comes from his initials. The game achieved a wider audience when Sid Sackson described it in A Gamut of Games.  LAP is sort of cross between 
Battleship &amp; Mastermind &amp; Polyominous/Fillomino puzzles:  Like in Battleship, both players try to deduce a 2-dimensional arrangement
created by the opponent. Thus it's not really an interactive game but more of a simultaneous solitaire activity, like Battleship at a high
level.  But like Mastermind, LAP involves interesting nontrivial logical deduction at a level higher and more challenging than that of
Battleship.  Like Polyominous puzzles, it includes reasoning about contiguous sections of a given size. 

https://boardgamegeek.com/thread/712697/neat-puzzle-solving-game-only-needs-graph-paper-an


Socket IO Communication Route

client1 -> SEND_GUESS -> server
server -> GUESS -> client2
client2 -> CLIENT_GUESS_RESPONSE -> server
server -> SERVER_GUESS_RESPONSE -> client1
