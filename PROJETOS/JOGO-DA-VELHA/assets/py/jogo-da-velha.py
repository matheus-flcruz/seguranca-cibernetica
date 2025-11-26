from random import randrange

def display_board(board):
    print("+-------" * 3 + "+")
    for row in range(3):
        print("|       " * 3 + "|")
        print("|   " + str(board[row][0]) + "   |   " + str(board[row][1]) + "   |   " + str(board[row][2]) + "   |")
        print("|       " * 3 + "|")
        print("+-------" * 3 + "+")

def enter_move(board):
    ok = False
    while not ok:
        move = input("Digite seu movimento: ") 
        ok = len(move) == 1 and move >= '1' and move <= '9'
        if not ok:
            print("Movimento inválido - digite um número de 1 a 9!")
            continue
        
        move = int(move) - 1
        row = move // 3
        col = move % 3
        
        sign = board[row][col]
        if sign in ['O', 'X']:
            print("Campo já ocupado!")
            ok = False
            continue
            
        board[row][col] = 'O'
        ok = True

def make_list_of_free_fields(board):
    free = []
    for row in range(3):
        for col in range(3):
            if board[row][col] not in ['O', 'X']:
                free.append((row, col))
    return free

def victory_for(board, sign):
    if sign == "X":
        who = 'computador' # 'me' na descrição do exercício era o PC
    elif sign == "O": 
        who = 'você' # 'you' na descrição
    else:
        who = None
        
    cross1 = cross2 = True
    for rc in range(3):
        if board[rc][0] == sign and board[rc][1] == sign and board[rc][2] == sign:
            return who
        if board[0][rc] == sign and board[1][rc] == sign and board[2][rc] == sign:
            return who
        if board[rc][rc] != sign:
            cross1 = False
        if board[2 - rc][rc] != sign:
            cross2 = False
            
    if cross1 or cross2:
        return who
    return None

def draw_move(board):
    print("Vez do Computador...")
    free = make_list_of_free_fields(board)
    cnt = len(free)
    if cnt > 0:
        this = randrange(cnt)
        row, col = free[this]
        board[row][col] = 'X'

# --- LOOP PRINCIPAL DO JOGO ---

# Inicialização: Computador começa no meio (5)
board = [
    [1, 2, 3],
    [4, "X", 6],
    [7, 8, 9]
]

human_turn = True # Humano começa jogando (após o setup inicial do PC)

while len(make_list_of_free_fields(board)) > 0:
    display_board(board)
    
    if human_turn:
        enter_move(board)
        winner = victory_for(board, "O")
    else:
        draw_move(board)
        winner = victory_for(board, "X")
        
    if winner != None:
        break # Alguém ganhou, sai do loop
        
    human_turn = not human_turn # Troca a vez

display_board(board)

if winner == 'você':
    print("Você GANHOU!!!!!!!!!! 🤘")
elif winner == 'computador':
    print("O Computador ganhou! Tente de novo.")
else:
    print("Empate!")