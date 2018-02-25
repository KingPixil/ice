import math
from ...loader import load
from ...color import generateColors
from ...seed import generateSeed
from ...random import randomNoise2D
from ...graphics import width, height, generateData, generatePoints, putColor, clearMargins, writeImage

# Generate
def generate():
    # Initialize
    seedText = generateSeed() # Seed
    data = generateData() # Image data
    p = generatePoints() # Points
    v = [] # Vectors
    color1, color2 = generateColors() # Colors
    lums = {} # Color lightnesses
    tt = 1000 # Total time

    # Vectors
    for x in range(0, width):
        vcol = []
        v.append(vcol)

        for y in range(0, height):
            angle = 2 * math.pi * randomNoise2D(x / 500, y / 500)
            vcol.append([math.cos(angle), math.sin(angle)])

    # Movement
    for t in range(tt):
        for pcol in p:
            for pc in pcol:
                x = pc[0]
                y = pc[1]

                vc = v[x][y]
                vx = vc[0]
                vy = vc[1]

                pc[0] = x + round(vx)
                pc[1] = y + round(vy)

                putColor(x, y, data, color1, color2, lums)
        load(t / (tt - 1))

    # Clear margins
    clearMargins(data)

    # Write
    writeImage(data)

    return seedText
