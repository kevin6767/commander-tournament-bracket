- [x] take input names

- [ ] input rounds

- [ ] create name object, has name of player and counter for each win and counter for each 1,2,3,4 finish

- [ ] init round will random

- [ ] after each round display give option to drop

- [ ] beginning of round pair players with similar points

- [ ] 'pods' should be even but can be mismatched

- [ ] whoever wins their pod gets 4, next is 3, rest are 2s

- [ ] after init game, handle top 8. pods are even and odds

- [ ] handle final pod

- [ ] handle strength of schedule for top 8 holding a value that's a percent.

- [ ] save each round and give option to revert

# strength of schedule logic --

## round 1

### Pod 1

- playerA -- > \*1 = 4 points = 1 quarter
- playerB -- > \*2 = 3 points = 1 dime
- playerC -- > \*3 = 2 points = 1 nickel
- playerD -- > \*4 = 2 points = 1 nickel

### Pod 2

- playerF -- > \*1 = 4 points = 1 quarter
- playerG -- > \*2 = 3 points = 1 dime
- playerH -- > \*3 = 2 points = 1 nickel
- playerI -- > \*4 = 2 points = 1 nickel

## round 2

### display highest winners

- playerA = 4
- playerF = 4
- playerB = 3
- playerG = 3
- ...

## players with highest amounts of points play each other

- playerA -- > \*1 = 4 points = 1 quarter
- playerF -- > \*2 = 3 points = 1 dime
- playerB -- > \*3 = 2 points = 1 nickel
- playerG -- > \*3 = 2 points = 1 nickel
