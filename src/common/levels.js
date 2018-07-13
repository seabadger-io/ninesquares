const levels = [
  [ 'easy', 'Easy' ],
  [ 'medium', 'Medium' ],
  [ 'hard', 'Hard' ],
  [ 'veryhard', 'Very hard' ]
];

export const getLevelName = (level) => {
 return levels.filter(([lid, ]) => {
    return lid === level;
  })[0][1];
}

export default levels;