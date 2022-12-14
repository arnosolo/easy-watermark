import { onBeforeUnmount, onMounted, ref } from "vue";

interface PickOptions {
  accept: string[];
  multiple?: boolean;
}

export function useFilesPicker() {
  const inputRef = ref<HTMLInputElement | null>(null);
  const files = ref<File[]>([]);
  onMounted(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.hidden = true;
    input.className = 'hidden';
    document.body.appendChild(input);
    inputRef.value = input;
  });

  // make sure to remove the element if the component is unmounted.
  onBeforeUnmount(() => {
    inputRef.value?.remove();
  });

  function pickFiles(opts?: Partial<PickOptions>) {
    // skip if the input wasn't mounted yet or was removed
    if (!inputRef.value) {
      files.value = [];
      return;
    }
    if (opts?.accept) {
      inputRef.value.accept = opts.accept.map(ext => `.${ext}`).join(',');
    }
    inputRef.value.multiple = opts?.multiple ?? false;
    // prepare event listener
    inputRef.value.onchange = (e) => {
      const fileList = (e.target as HTMLInputElement).files;
      files.value = fileList ? Array.from(fileList) : [];
      // clear the event listener
      if (inputRef.value) {
        inputRef.value.onchange = null;
      }
    };
    inputRef.value.click();
  }

  function resetFiles() {
    inputRef.value!.value = '';
    files.value = [];
  }

  return {
    pickFiles,
    resetFiles,
    files,
  };
}
