// Mirrors the Hog code in PostHog's device-marketing-names transformation (#112937).
(function () {
  const names = window.DEVICE_NAMES;
  const form = document.getElementById('demo');
  const model = document.getElementById('model');
  const emulator = document.getElementById('emulator');
  const emulatorValue = document.getElementById('emulator-value');
  const output = document.getElementById('name');

  function transform(deviceModel, isEmulator) {
    if (!deviceModel) return null;
    // Native macOS apps also report a CPU architecture, so only the simulator flag can tell them apart.
    if ((deviceModel === 'arm64' || deviceModel === 'x86_64') && !isEmulator) return null;
    return names[deviceModel] || null;
  }

  function render() {
    emulatorValue.textContent = String(emulator.checked);
    if (!names) {
      output.textContent = 'Device table did not load';
      output.dataset.state = 'missing';
      return;
    }
    const name = transform(model.value.trim(), emulator.checked);
    output.textContent = name ? '"' + name + '"' : 'not set';
    output.dataset.state = name ? 'set' : 'missing';
    output.classList.remove('flash');
    void output.offsetWidth;
    output.classList.add('flash');
  }

  form.addEventListener('submit', (e) => e.preventDefault());
  model.addEventListener('input', render);
  emulator.addEventListener('change', render);
  render();
})();
