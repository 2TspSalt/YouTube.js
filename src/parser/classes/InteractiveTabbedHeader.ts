import Parser from '../index.js';
import { ObservedArray, YTNode } from '../helpers.js';

import Text from './misc/Text.js';
import Thumbnail from './misc/Thumbnail.js';
import SubscribeButton from './SubscribeButton.js';
import MetadataBadge from './MetadataBadge.js';
import Button from './Button.js';

class InteractiveTabbedHeader extends YTNode {
  static type = 'InteractiveTabbedHeader';

  header_type: string;
  title: Text;
  description: Text;
  metadata: Text;
  badges: MetadataBadge[];
  box_art: Thumbnail[];
  banner: Thumbnail[];
  buttons: ObservedArray<SubscribeButton | Button>;
  auto_generated: Text;

  constructor(data: any) {
    super();

    this.header_type = data.type;
    this.title = new Text(data.title);
    this.description = new Text(data.description);
    this.metadata = new Text(data.metadata);
    this.badges = Parser.parseArray<MetadataBadge>(data.badges, MetadataBadge);
    this.box_art = Thumbnail.fromResponse(data.boxArt);
    this.banner = Thumbnail.fromResponse(data.banner);
    this.buttons = Parser.parseArray<SubscribeButton | Button>(data.buttons, [ SubscribeButton, Button ]);
    this.auto_generated = new Text(data.autoGenerated);
  }
}

export default InteractiveTabbedHeader;