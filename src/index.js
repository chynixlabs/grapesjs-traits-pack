import loadTraits from './traits';

export default (editor, opts = {}) => {
  const options = {
    selectMultipleTrait: {
      options: [
        {
          id: 'option_1',
          name: 'Option 1'
        },
        {
          id: 'option_2',
          name: 'Option 2'
        }
      ],
      stringifyArray: true,
      stringSeperator: ','
    },
    ...opts
  }

  loadTraits(editor, options)
}