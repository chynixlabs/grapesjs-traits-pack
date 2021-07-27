import {
  selectMultipleId
} from '../consts'

export default (editor, opts = {}) => {
  const tm = editor.TraitManager
  const {
    selectMultipleTrait
  } = opts
  
  tm.addType(selectMultipleId, {
    createInput({ trait }) {
      const traitOpts = trait.get('options') || []
      const el = document.createElement('div')
      const options = traitOpts.length ? traitOpts : selectMultipleTrait.options;

      el.innerHTML = '<select multiple>' + options.map(obj => '<option value="' + obj.id + '">' + obj.name + '</option>').join('') + '</select>'
      return el
    },
    onEvent({ component, elInput, trait }) {
      let selected = []
      const stringifyArray = typeof trait.get('stringifyArray') != 'undefined' ? trait.get('stringifyArray') : selectMultipleTrait.stringifyArray;
      const stringSeperator = typeof trait.get('stringSeperator') != 'undefined' ? trait.get('stringSeperator') : selectMultipleTrait.stringSeperator;
      const el = elInput.querySelector('select')

      Array.from(el.selectedOptions).forEach(option => selected.push(option.value))
      selected = stringifyArray == true ? (JSON.stringify(selected)).replace(/'/g, "\\'") : selected.join(stringSeperator);
      trait.get('changeProp') ? component.set(trait.id, selected) : component.addAttributes({ [trait.id] : selected })
    },
    onUpdate({ component, elInput, trait }) {
      const el = elInput.querySelector('select')
      const stringifyArray = typeof trait.get('stringifyArray') != 'undefined' ? trait.get('stringifyArray') : selectMultipleTrait.stringifyArray;
      const stringSeperator = typeof trait.get('stringSeperator') != 'undefined' ? trait.get('stringSeperator') : selectMultipleTrait.stringSeperator;
      let selected = trait.get('changeProp') ? component.get(trait.id) : component.getAttributes()[trait.id];
      
      selected && (
        selected = stringifyArray == true ? JSON.parse(selected) : selected.split(stringSeperator),
        Array.from(el.options).forEach(option => {
          selected.includes(option.value) && (option.selected = true)
        })
      )
    }
  })
}