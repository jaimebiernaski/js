/**
You are given a string and two markers (the initial and final). You have to find a substring enclosed between these two markers. But there are a few important conditions:

The initial and final markers are always different.
If there is no initial marker, then the first character should be considered the beginning of a string.
If there is no final marker, then the last character should be considered the ending of a string.
If the initial and final markers are missing then simply return the whole string.
If the final marker comes before the initial marker, then return an empty string.
Input: Three arguments. All of them are strings. The second and third arguments are the initial and final markers.

Output: A string.

Example:

betweenMarkers('What is >apple<', '>', '<') == 'apple'
betweenMarkers('No[/b] hi', '[b]', '[/b]') == 'No'
1
2
How it is used: for parsing texts

Precondition: can't be more than one final marker and can't be more than one initial. Marker can't be an empty string
 */

function betweenMarkers(text: string, begin: string, end: string): string {
  if (!begin && !end) {
    return text;
  }

  if (!begin) {
    begin = text.split('')[0];
  }

  if (!end) {
    end = text.split('')[text.length - 1];
  }

  let consume: Boolean = false;

  let res: String[] = text
    .split('')
    .reduce((acc: String[], cur: String): String[] => {
      if (cur === end && !consume) {
        return [];
      }
      if (cur === begin && !consume) {
        consume = true;
      } else if (cur === end && consume) {
        consume = false;
      } else if (consume) {
        acc.push(cur);
      }

      return acc;
    }, []);

  return res.join('');
}

console.log('Example:');
// console.log(betweenMarkers('What is >apple<', '>', '<'), 'apple');

console.log(betweenMarkers('What is >apple<', '>', '<'));
console.log(
  betweenMarkers(
    '<head><title>My new site</title></head>',
    '<title>',
    '</title>'
  )
);
console.log(betweenMarkers('No[/b] hi', '[b]', '[/b]'));
console.log(betweenMarkers('No [b]hi', '[b]', '[/b]'));
console.log(betweenMarkers('No hi', '[b]', '[/b]'));
console.log(betweenMarkers('No <hi>', '>', '<'));
console.log(
  "Coding complete? Click 'Check' to review your tests and earn cool rewards!"
);
