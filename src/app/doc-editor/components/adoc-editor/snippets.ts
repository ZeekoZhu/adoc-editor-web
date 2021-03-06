import * as ace from 'ace-builds';

const snippetsDef = `
snippet code
	[source, \${1:lang}]
	----
	\${2:// hello, world}
	----
snippet table
	|===
	\${1}
	|===
snippet img
	image:\${1:url}[\${2:alt}]
snippet pic
	image::\${1:url}[\${2:alt}]
`;

export const addSnippets = (editor) => {
    return new Promise(((resolve, reject) => {
        try {
            ace.config.loadModule('ace/ext/language_tools', m => {
                editor.setOptions({
                    enableSnippets: true,
                });
                ace.config.loadModule('ace/snippets', x => {
                    const snippets = x.snippetManager.parseSnippetFile(snippetsDef);
                    x.snippetManager.register(snippets, 'asciidoctor');
                    resolve();
                });
            });
        } catch (e) {
            reject(e);
        }
    }));
};
