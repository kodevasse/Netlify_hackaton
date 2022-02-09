import { ref } from "vue";

export const tester = () => {
  var id = 1 + 2;
  var id2 = ++id;
  console.log(id2);
};
export const looper = () => {
  for (var i = 0; i < 10; i++) {
    console.log(i);
  }
};
