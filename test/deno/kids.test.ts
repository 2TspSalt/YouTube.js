import { expect } from "jsr:@std/expect";
import { beforeAll } from "jsr:@std/testing/bdd";
import { Innertube } from "../../deno.ts";

const test = Deno.test;

let innertube: Innertube;

beforeAll(async () => {
  innertube = await Innertube.create({ generate_session_locally: true });
});

test("Innertube#kids.getInfo", async () => {
  const info = await innertube.kids.getInfo("juN8qEgLScw");
  expect(info).toBeDefined();
  expect(info.basic_info?.id).toBe("juN8qEgLScw");
});

test("Innertube#kids.getHomeFeed", async () => {
  const home = await innertube.kids.getHomeFeed();
  expect(home).toBeDefined();
  expect(home.categories).toBeDefined();
  expect(home.contents?.anchors?.length).toBeGreaterThan(0);
});

test("Innertube#kids.getChannel", async () => {
  const channel = await innertube.kids.getChannel("UCpbpfcZfo-hoDAx2m1blFhg");
  expect(channel).toBeDefined();
  expect(channel.contents).toBeDefined();
  expect(channel.header).toBeDefined();
});

test("Innertube#kids.search", async () => {
  const search = await innertube.kids.search("Paw Patrol");
  expect(search).toBeDefined();
  expect(search.contents).toBeDefined();
  expect(search.contents?.length).toBeGreaterThan(0);
});
