<script>
import Quill from 'quill'
import Delta from 'quill-delta'
import { toolbarOptions } from './options'

export default {
    name: 'QuillEditor',
    props: {
        content: {},
        contentType: { default: 'delta' },
        enable: { default: true },
        readOnly: { default: false },
        placeholder: {},
        theme: { default: 'snow' },
        toolbar: {},
        modules: {},
        options: {},
        globalOptions: {}
    },
    data() {
        return {
            quill: null,
            internalModel: null,
            isEditorFocus: false
        }
    },
    mounted() {
        this.initialize()
    },
    beforeUnmount() {
        this.quill = null
    },
    watch: {
        content(newContent) {
            if (!this.quill || !newContent || this.internalModelEquals(newContent)) return
            const selection = this.quill.getSelection()
            this.setContents(newContent)
            if (selection) this.quill.setSelection(selection)
        },
        enable(newValue) {
            if (this.quill) this.quill.enable(newValue)
        },
        isEditorFocus(val) {
            this.$emit(val ? 'focus' : 'blur', this.$refs.editor)
        }
    },
    methods: {
        registerModule(name, module) {
            if (Quill.imports && !(name in Quill.imports)) Quill.register(name, module)
        },
        composeOptions() {
            const clientOptions = {}
            if (this.theme) clientOptions.theme = this.theme
            if (this.readOnly) clientOptions.readOnly = this.readOnly
            if (this.placeholder) clientOptions.placeholder = this.placeholder
            if (this.toolbar) {
                clientOptions.modules = {
                    toolbar: typeof this.toolbar === 'object'
                        ? this.toolbar
                        : (typeof this.toolbar === 'string' && this.toolbar.charAt(0) === '#')
                            ? this.toolbar
                            : toolbarOptions[this.toolbar]
                }
            }
            if (this.modules) {
                const modulesOption = {}
                if (Array.isArray(this.modules)) {
                    for (const m of this.modules) modulesOption[m.name] = m.options || {}
                } else {
                    modulesOption[this.modules.name] = this.modules.options || {}
                }
                clientOptions.modules = Object.assign({}, clientOptions.modules, modulesOption)
            }
            return Object.assign({}, this.globalOptions, this.options, clientOptions)
        },
        maybeClone(delta) {
            return typeof delta === 'object' && delta ? delta.slice() : delta
        },
        deltaHasValuesOtherThanRetain(delta) {
            return delta.ops.some(op => !op.retain || Object.keys(op).length !== 1)
        },
        internalModelEquals(against) {
            if (typeof this.internalModel === typeof against) {
                if (against === this.internalModel) return true
                if (typeof against === 'object' && against && typeof this.internalModel === 'object' && this.internalModel) {
                    return !(this.deltaHasValuesOtherThanRetain(this.internalModel.diff(against)))
                }
            }
            return false
        },
        handleTextChange(delta, oldContents, source) {
            this.internalModel = this.maybeClone(this.getContents())
            if (!this.internalModelEquals(this.content)) this.$emit('update:content', this.internalModel)
            this.$emit('textChange', { delta, oldContents, source })
        },
        handleSelectionChange(range, oldRange, source) {
            this.isEditorFocus = !!this.quill?.hasFocus()
            this.$emit('selectionChange', { range, oldRange, source })
        },
        handleEditorChange(...args) {
            if (args[0] === 'text-change') this.$emit('editorChange', { name: args[0], delta: args[1], oldContents: args[2], source: args[3] })
            if (args[0] === 'selection-change') this.$emit('editorChange', { name: args[0], range: args[1], oldRange: args[2], source: args[3] })
        },
        initialize() {
            if (!this.$refs.editor) return
            const options = this.composeOptions()
            if (this.modules) {
                if (Array.isArray(this.modules)) {
                    for (const m of this.modules) this.registerModule(`modules/${m.name}`, m.module)
                } else {
                    this.registerModule(`modules/${this.modules.name}`, this.modules.module)
                }
            }
            this.quill = new Quill(this.$refs.editor, options)
            this.setContents(this.content)
            this.quill.on('text-change', this.handleTextChange)
            this.quill.on('selection-change', this.handleSelectionChange)
            this.quill.on('editor-change', this.handleEditorChange)
            const toolbarEl = this.quill.getModule('toolbar')?.container
            toolbarEl?.addEventListener('mousedown', e => e.preventDefault())
            this.$emit('ready', this.quill)
        },
        getContents(index, length) {
            if (!this.quill) return
            if (this.contentType === 'html') return this.getHTML()
            if (this.contentType === 'text') return this.getText(index, length)
            return this.quill.getContents(index, length)
        },
        setContents(content, source = 'api') {
            let normalized = content || (this.contentType === 'delta' ? new Delta() : '')
            if (this.contentType === 'html') this.setHTML(normalized)
            else if (this.contentType === 'text') this.setText(normalized, source)
            else this.quill?.setContents(normalized, source)
            this.internalModel = this.maybeClone(normalized)
        },
        getText(index, length) {
            return this.quill?.getText(index, length) || ''
        },
        setText(text, source = 'api') {
            this.quill?.setText(text, source)
        },
        getHTML() {
            return this.quill?.root.innerHTML || ''
        },
        setHTML(html) {
            if (this.quill) this.quill.root.innerHTML = html
        },
        pasteHTML(html, source = 'api') {
            const delta = this.quill?.clipboard.convert(html)
            if (delta) this.quill?.setContents(delta, source)
        },
        focus() {
            this.quill?.focus()
        },
        getEditor() {
            return this.$refs.editor
        },
        getToolbar() {
            return this.quill?.getModule('toolbar')?.container
        },
        getQuill() {
            if (this.quill) return this.quill
            throw new Error("Quill n'est pas encore initialisé")
        },
        reinit() {
            if (!this.$slots.toolbar && this.quill) this.quill.getModule('toolbar')?.container.remove()
            this.$nextTick(this.initialize)
        }
    }
}
</script>

<template>
    <slot name="toolbar"></slot>
    <div ref="editor"></div>
</template>

<style scoped>
.ql-container {
    border: none;
}

.ql-editor {
    min-height: 150px;
    height: 100%;
    overflow-y: auto;
    padding: 0;
    font-size: 2.5rem;
    line-height: 1.2;
}
</style>
