import { Asciidoctor } from 'asciidoctor';
import Registry = Asciidoctor.Extensions.Registry;
import ProcessorOptions = Asciidoctor.ProcessorOptions;

const blockIdMarkerProcessor = (registry: Registry) => {
    registry.treeProcessor(function () {
        this.process(doc => {
            const blocks = doc.findBy(() => true);
            blocks.forEach(blk => {
                const lineMark = '__adoc-line-' + blk.getLineNumber();
                blk.addRole(lineMark);
            });
        });
    });
};

export class AdocConverter {
    private registry = this.processor.Extensions.create();
    private convertOpt: ProcessorOptions = {
        sourcemap: true,
        extension_registry: this.registry,
        standalone: false,
        attributes: {
            showtitle: true,
        },
    };

    constructor(private processor: Asciidoctor) {
        blockIdMarkerProcessor(this.registry);
    }

    convert(content: string) {
        return this.processor.load(content, this.convertOpt).convert();
    }
}
