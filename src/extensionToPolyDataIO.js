const extensionToIO = new Map([
  ['vtk', 'VTKLegacyFileReader'],
  ['VTK', 'VTKLegacyFileReader'],
  ['vtp', 'VTKXMLFileReader'],
  ['VTP', 'VTKXMLFileReader'],
  ['vtu', 'VTKXMLFileReader'],
  ['VTU', 'VTKXMLFileReader']
])

module.exports = extensionToIO
