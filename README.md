# Polyomino

This page tiles a canvas with translations of an exact polyomino, and adds ASCII characters inside each tile.  The intended use is to produce a raster image that can be converted into an SVG for use in a laser cutter, so that the tiles can be made into an alphabet jigsaw puzzle toy.

An exact polyomino is defined in Beauquier and Nivat's paper:
[On Translating One Polyomino To Tile the Plane](https://link.springer.com/content/pdf/10.1007/BF02574705.pdf)

> Given a polyomino, we prove that we can decide whether translated copies
> of the polyomino can tile the plane. Copies that are rotated, for example, are not
> allowed in the tilings we consider. If such a tiling exists the polyomino is called an
> *exact polyomino*. 

Tested with Chrome 100.0.4896.88

To use:

1. Clone the repo
2. Install modules using **npm install**
3. Start the app using **npm start**
4. Visit page [localhost:3000/polyomino](localhost:3000/polyomino)

Parameters for the polyomino--such as its shape, font, or canvas size--can be modified in the **polyomino-config.json** file.  This file will also allow for multiple canvases to be used, so that more than one type of planar tiling can be displayed.

Further intended work:

* tile a particular shape, as per Kita and Miyata's paper [Computational Design of Polyomino Puzzles](https://naokita.xyz/projects/PolyominoPuzzles/index.html).