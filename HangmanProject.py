import random

# Word list to choose from
word_lists = ["Hyundai", "Toyota", "byd", "Tesla", "Ferrari"]
chosen_word = random.choice(word_lists).lower()

# Create display with "_" for each letter
display = ["_"] * len(chosen_word)

# Maximum number of wrong guesses
lives = 7

# Hangman drawing stages (from 1st mistake to game over)

hangman_stages = [
    '''
      +---+
      |   |
          |
          |                 
          |
          |
    =========
    ''',
    '''
      +---+
      |   |
      O   |
          |
          |
          |
    =========
    ''',
    '''
      +---+
      |   |
      O   |
      |   |
          |
          |
    =========
    ''',
    '''
      +---+
      |   |
      O   |
     /|   |
          |
          |
    =========
    ''',
    '''
      +---+
      |   |
      O   |
     /|\  |
          |
          |
    =========
    ''',
    '''
      +---+
      |   |
      O   |
     /|\  |
     /    |
          |
    =========
    ''',
    '''
      +---+
      |   |
      O   |
     /|\  |
     / \  |
          |
    =========
    '''
]

# Track guessed letters to prevent repeats
guessed_letters = set()

# Welcome message and initial blanks
print("🎮 Welcome to Hangman!")
print(" ".join(display))

# Game loop: until word is guessed or lives run out
while lives > 0 and "_" in display:
    guess = input("🔤 Guess a letter: ").lower()

    # Input validation
    if not guess.isalpha() or len(guess) != 1:
        print("❌ Please enter a **single alphabet letter**.")
        continue

    if guess in guessed_letters:
        print("🔁 You already guessed that letter.")
        continue

    guessed_letters.add(guess)

    # Check if guess is correct
    if guess in chosen_word:
        for index, letter in enumerate(chosen_word):
            if letter == guess:
                display[index] = guess
    else:
        lives -= 1
        print(hangman_stages[7 - lives - 1])  # Draw hangman part
        print(f"❗ Incorrect! Lives left: {lives}")

    print(" ".join(display))  # Show progress

# Game end: check win or lose
if "_" not in display:
    print("🎉 You win!")
else:
    print("💀 You lose! The word was:", chosen_word)
