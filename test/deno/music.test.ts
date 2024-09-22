import { expect } from "jsr:@std/expect";
import { beforeAll } from "jsr:@std/testing/bdd";
import { Innertube, YTMusic, YTNodes } from "../../deno.ts";

const describe = Deno.test;
const test = Deno.test;

let innertube: Innertube;

beforeAll(async () => {
  innertube = await Innertube.create({ generate_session_locally: true });
});

// test('Innertube#music.getInfo', async () => {
//   const info = await innertube.music.getInfo('WSeNSzJ2-Jw');
//   expect(info).toBeDefined();
//   expect(info.basic_info.id).toBe('WSeNSzJ2-Jw');
// });

test("Innertube#music.getInfo.MusicResponsiveListItem", async () => {
  const playlist = await innertube.music.getPlaylist(
    "PLQxo8OvVvJ1WI_Bp67F2wdIl_R2Rc_1-u"
  );
  expect(playlist).toBeDefined();
  expect(playlist.header).toBeDefined();
  expect(playlist.contents).toBeDefined();
  expect(playlist.contents?.length).toBeGreaterThan(0);

  const info = await innertube.music.getInfo(playlist.contents!.first());
  expect(info).toBeDefined();
});

test("Innertube#music.getInfo.NavEndpoint", async () => {
  const playlist = await innertube.music.getPlaylist(
    "PLQxo8OvVvJ1WI_Bp67F2wdIl_R2Rc_1-u"
  );
  expect(playlist).toBeDefined();
  expect(playlist.header).toBeDefined();
  expect(playlist.contents).toBeDefined();
  expect(playlist.contents?.length).toBeGreaterThan(0);

  const playlistPlayEndpoint = playlist
    .header!.as(YTNodes.MusicResponsiveHeader)
    .buttons.firstOfType(YTNodes.MusicPlayButton)!.endpoint;

  const info = await innertube.music.getInfo(playlistPlayEndpoint);
  expect(info).toBeDefined();

  const upNext = await info.getUpNext();
  expect(upNext.playlist_id).toBe("PLQxo8OvVvJ1WI_Bp67F2wdIl_R2Rc_1-u");
});

describe("Innertube#music.search", () => {
  let search: YTMusic.Search;

  beforeAll(async () => {
    search = await innertube.music.search("Mac Miller - Conversation Pt. 1");
    expect(search).toBeDefined();
    expect(search.contents).toBeDefined();
    expect(search.contents?.length).toBeGreaterThan(0);
  });

  test("Search#applyFilter", async () => {
    search = await search.applyFilter(search.filters[1]);
    expect(search).toBeDefined();
    expect(search.contents).toBeDefined();
    expect(search.contents?.length).toBeGreaterThan(0);
  });

  test("Search#getContinuation", async () => {
    const incremental_continuation = await search.getContinuation();
    expect(incremental_continuation).toBeDefined();
    expect(incremental_continuation.contents).toBeDefined();
    expect(incremental_continuation.contents?.contents).toBeDefined();
    expect(incremental_continuation.contents?.contents?.length).toBeGreaterThan(
      0
    );
  });
});

describe("Innertube#music.getHomeFeed", () => {
  let home: YTMusic.HomeFeed;

  beforeAll(async () => {
    home = await innertube.music.getHomeFeed();
    expect(home).toBeDefined();
    expect(home.sections).toBeDefined();
    expect(home.sections?.length).toBeGreaterThan(0);
  });

  test("HomeFeed#getContinuation", async () => {
    const incremental_continuation = await home.getContinuation();
    expect(incremental_continuation).toBeDefined();
    expect(incremental_continuation.sections).toBeDefined();
    expect(incremental_continuation.sections?.length).toBeGreaterThan(0);
  });

  test("HomeFeed#applyFilter", async () => {
    home = await home.applyFilter(home.filters[1]);
    expect(home).toBeDefined();
    expect(home.sections).toBeDefined();
    expect(home.sections?.length).toBeGreaterThan(0);
  });
});

test("Innertube#music.getExplore", async () => {
  const explore = await innertube.music.getExplore();
  expect(explore).toBeDefined();
  expect(explore.sections).toBeDefined();
  expect(explore.sections?.length).toBeGreaterThan(0);
  expect(explore.top_buttons).toBeDefined();
});

test("Innertube#music.getArtist", async () => {
  const artist = await innertube.music.getArtist("UC52ZqHVQz5OoGhvbWiRal6g");
  expect(artist).toBeDefined();
  expect(artist.header).toBeDefined();
  expect(artist.sections).toBeDefined();
});

test("Innertube#music.getAlbum", async () => {
  const album = await innertube.music.getAlbum("MPREb_YpQ7SWMPLvu");
  expect(album).toBeDefined();
  expect(album.header).toBeDefined();
  expect(album.sections).toBeDefined();
});

test("Innertube#music.getPlaylist", async () => {
  const playlist = await innertube.music.getPlaylist(
    "PLQxo8OvVvJ1WI_Bp67F2wdIl_R2Rc_1-u"
  );
  expect(playlist).toBeDefined();
  expect(playlist.header).toBeDefined();
  expect(playlist.contents).toBeDefined();
  expect(playlist.contents?.length).toBeGreaterThan(0);
});

test("Innertube#music.getLyrics", async () => {
  const lyrics = await innertube.music.getLyrics("eaJHysi5tYg");
  expect(lyrics).toBeDefined();
  expect(lyrics?.description).toBeDefined();
  expect(lyrics?.footer).toBeDefined();
});

test("Innertube#music.getUpNext", async () => {
  const upnext = await innertube.music.getUpNext("eaJHysi5tYg");
  expect(upnext).toBeDefined();
  expect(upnext?.contents).toBeDefined();
  expect(upnext?.contents?.length).toBeGreaterThan(0);
});

test("Innertube#music.getRelated", async () => {
  const related = await innertube.music.getRelated("eaJHysi5tYg");
  expect(related).toBeDefined();
});

test("Innertube#music.getSearchSuggestions", async () => {
  const suggestions = await innertube.music.getSearchSuggestions(
    "Joji - In Tongues"
  );
  expect(suggestions).toBeDefined();
  expect(suggestions?.length).toBeGreaterThan(0);
});
