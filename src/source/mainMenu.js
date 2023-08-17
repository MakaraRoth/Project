module.exports = [
  {
    label: 'Electron',
    submenu: [
      { label: 'item1' },
      {
        label: 'item2',
        submenu: [
          {
            label: 'sub1',
          }, {
            label: 'sub2',
          }, {
            label: 'sub3',
          }
        ]
      },
    { label: 'item3' }, 
    { label: 'item4' },
    { label: 'item5' },
  ]
},
{
 label : 'Edit ',
 submenu : [
  {role : 'undo'},
  {role : 'redo'},
  {role : 'copy'},
  {role : 'paste'}
 ] 
},
{
  label: 'Action',
  submenu: [
    {
      label: 'Devtools',
      role: 'toggleDevTools'
    },
    {
      role: 'toggleFullScreen'
    },
    {
      label: 'test2',
      click: () => {
        console.log('Hello from Main Menu');
      },
      accelerator: 'Control + Shift + I'
    }
  ]
}
]