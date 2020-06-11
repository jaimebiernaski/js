function distance(x, y) {
  // axes symmetry
  x = Math.abs(x);
  y = Math.abs(y);

  // diagonal symmetry
  if (x < y) {
    let t = x;
    x = y;
    y = t;
  }
  // 2 corner cases
  if (x == 1 && y == 0) {
    return 3;
  }
  if (x == 2 && y == 2) {
    return 4;
  }

  // main formula
  let delta = x - y;
  console.log(delta, x, y);

  if (y > delta) {
    return delta - 2 * Math.floor((delta - y) / 3);
  } else {
    return delta - 2 * Math.floor((delta - y) / 4);
  }
}

console.log(distance(7, 4));

/*


************************

 Then if you find Δ𝑥,Δ𝑦 (unsigned), compute the maximum of (Δ𝑥/2,Δ𝑦/2,Δ𝑥+Δ𝑦/3) and round up to the nearest integer. Call this 𝑚′. Now calculate the move count 𝑚 as follows:

 𝑚=𝑚′+((𝑚′+Δ𝑥+Δ𝑦)mod2)

 To handle close-in squares (on a board of at least 5×5) we can list the exceptions:
 
                                Δ𝑥=Δ𝑦=2⟹𝑚=4
                                Δ𝑥+Δ𝑦=1⟹𝑚=3
 For a knight in a corner only, Δ𝑥=Δ𝑦=1⟹𝑚=4

Δ𝑥 and Δ𝑦 are the difference in square position in 𝑥 and 𝑦 directions (it doesn't matter which direction is which). A normal knight move has Δ𝑥=1 and Δ𝑦=2 (or the other way around).

Basically there is a "distance" away from the the knight which is important - that get us to 𝑚′ - and there is a square color adjustment, which takes us to 𝑚. Then as you see there are special cases for short distances.


Sources:

https://apetresc.wordpress.com/2010/10/25/the-knight-metric/

https://math.stackexchange.com/questions/1135683/minimum-number-of-steps-for-knight-in-chess/1137144#1137144

***************

**** Knight metric ****

The knight metric is a metric on Zˆ2, defined as the minimum number
of moves a chess knight would take to travel from x to y ∈ Zˆ2 . 

Its unit sphere Sˆ1 Knight, centered at the origin, contains exactly 8 integral points
{(±2, ±1), (±1, ±2)}, and can be written as S^1 knight = S^3L1 ∩ S^2l∞ , where 
S^3L1 denotes the L1-sphere of radius 3, and S^2L∞ denotes the L∞-sphere 
of radius 2, both centered at the origin (see [DaCh88]).

The distance between x and y is 3 if (M,m) = (1,0), is 4 if (M,m) = (2,2) 
and is equal to :

max {⌈ M/2 ⌉ , ⌈ (M+m)/3 ⌉} + ( M+m ) − max {⌈ M/2 ⌉,⌈ (M+m)/3 ⌉} (mod 2) 
7,4
     ⌈ 7/2 ⌉ , ⌈ (7+4)/3 ⌉} + ( 7+4 ) - max {⌈ 7/2 ⌉,⌈ (7+4)/3 ⌉} (mod 2) 
max {  4     ,       4    } +    11)  - max {   4    ,    4     } (mod 2) 
16-4 mod2

otherwise, where M = max{ |u1|, |u2| }, m = min{ |u1|, |u2| }, u1 = x1 − y1, u2 = x2 − y2.

*/
