import { registries, mod, INDEX } from "./registry";
import path from "path";

test("registry : registries : name", async () => {
  expect(await registries()).toEqual(["nest", "x"]);
});

test("registry : modules : name", async () => {
  expect(await mod("nest", "denon")).toEqual(
    path.join(INDEX, "nest", "de", "no", "denon")
  );
});
