import { IComment } from "@app/Services/Instagram.interface";

export function countTaggedPeople(text: string, validNumber: number) {
  return ((text || '').match(/@/g) || []).length === validNumber;
}

export function chooseWinners(userComments: IComment[], numberOfWinner: number) {
  const theWinners = [];
  if (userComments.length < numberOfWinner) {
    for (let i = 0; i < numberOfWinner; i++) {
      const winner = userComments[Math.floor(Math.random() * userComments.length)];
      theWinners.push(winner);
    }
  } else {
    theWinners.push(...userComments);
  }

  return theWinners;
}