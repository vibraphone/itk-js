import readImageDICOMFileSeries from 'itk/readImageDICOMFileSeries'
import curry from 'curry'

import setupDicomForm from './dicomForm'
import parseDicomFiles from './parseDicomFiles'

const outputFileInformation = curry(async function outputFileInformation (outputTextArea, event) {
  outputTextArea.textContent = "Parsing..."

  // Get files
  const dataTransfer = event.dataTransfer
  const files = event.target.files || dataTransfer.files

  // Parse DICOM metadata
  const { patientDict, failures } = await parseDicomFiles(files, true)

  // Select DICOM serie
  outputTextArea.textContent = "Please select serie..."
  setupDicomForm(patientDict, async (files) => {
    outputTextArea.textContent = "Loading..."

    // Read DICOM serie
    const { image, webWorker } = await readImageDICOMFileSeries(null, files)
    webWorker.terminate()

    // Display
    function replacer (key, value) {
      if (!!value && value.byteLength !== undefined) {
        return String(value.slice(0, 6)) + '...'
      }
      return value
    }
    outputTextArea.textContent = JSON.stringify(image, replacer, 4)
  })
})

export { outputFileInformation }