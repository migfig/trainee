import IDefinition from "./types/Definition";

const downloadUri = (uri: string, name: string) => {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
};

const downloader = (data: BlobPart, type: string, name: string) => {
    const blob = new Blob([data], { type });
    const url = window.URL.createObjectURL(blob);
    downloadUri(url, name);
    window.URL.revokeObjectURL(url);
};

const buildMarkdown = (def: IDefinition): string =>
    `---
id: ${def.id}
title: ${def.name}
challengeType: ${def.challengeType}
isHidden: ${def.isHidden}
videoUrl: '${def.videoUrl}'
forumTopicId: ${def.forumTopicId}
---

${def.description}

## Tests
<section id='tests'>

|||yml
tests:
${def.sourceTests.map(t => `\t- text: ${t.text}\n\t\ttestString: ${t.testString}`).join('\n')}
|||

</section>

## Challenge Seed
<section id='challengeSeed'>

<div id='html-seed'>

|||html
${def.htmlSource}
|||

</div>

</section>

## Solution
<section id='solution'>

|||html
${def.htmlSource}
|||

</section>
`.replace(/\|/g, '`')

export {
    downloader,
    buildMarkdown
};
