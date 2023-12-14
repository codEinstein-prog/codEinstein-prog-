# Infinite runner random generator level difficulty game
import random
import pygame

pygame.init()

# game constants
white = (255,255,255)
black = (0,0,0)
green = (0,255,0)
red = (255, 0, 0)
orange = (255, 165, 0)
yellow = (255, 255, 0)
width = 450
HEIGHT = 300

# game variables
score = 0
Player_x = 50
Player_y = 200
y_change = 0
velocity = 12
x_change = 0
gravity = 1
active = True
enemy = [300, 450, 600]
enemy_speed = 2

screen = pygame.display.set_mode([width, HEIGHT])
pygame.display.set_caption('Infinite Runner')
background = black
fps = 60
#font = pygame.font.Font('freesansbold.tff', 16)
timer = pygame.time.Clock()

running = True
while running:
    timer.tick(fps)
    screen.fill(background)
    floor = pygame.draw.rect(screen, white, [0, 220, width, 5])
    player = pygame.draw.rect(screen, green, [Player_x, Player_y, 20, 20])
    enemy0 = pygame.draw.rect(screen, red, [enemy[0], 200, 20, 20])
    enemy1 = pygame.draw.rect(screen, orange, [enemy[1], 200, 20, 20])
    enemy2 = pygame.draw.rect(screen, yellow, [enemy[2], 200, 20, 20])

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE and y_change == 0:
                y_change = 18

            if event.key == pygame.K_RIGHT:
                x_change = 2
            if event.key == pygame.K_LEFT:
                x_change = -2

        if event.type == pygame.KEYUP:
            if event.key == pygame.K_RIGHT:
                x_change = 0

            if event.type == pygame.KEYUP:
                if event.key == pygame.K_LEFT:
                    x_change = 0

for i in range(len(enemy)):
    if active:
        enemy[i] -= enemy_speed
        if enemy[i] < -20:
            enemy[i] = random.randint(470, 570)
            score += 1

        if player.colliderect(enemy0) or player.colliderect(enemy1) or player.colliderect(enemy2):
            active = False

    if 0 <= Player_x <= 430:
        Player_x += x_change

    if Player_x < 0:
        Player_x = 0

    if Player_x > 430:
        Player_x = 430

    # jump logic
    if y_change > 0 or Player_y < 200:
        Player_y -= y_change
        y_change -= gravity

    if Player_y > 200:
        Player_y = 200

    if Player_y == 200 and y_change < 0:
        y_change = 0

    pygame.display.flip()
pygame.quit()