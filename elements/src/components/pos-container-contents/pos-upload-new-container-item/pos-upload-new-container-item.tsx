import { LdpContainer, PodOS } from '@pod-os/core';
import { Component, Element, EventEmitter, h, Prop, State, Event } from '@stencil/core';
import { usePodOS } from '../../events/usePodOS';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';

@Component({
  tag: 'pos-upload-new-container-item',
  shadow: true,
})
export class PosUploadNewContainerItem {
  @Element() el: HTMLElement;

  @Prop()
  container!: LdpContainer;

  @State()
  os: PodOS;

  @Event({ eventName: 'pod-os:upload-dialog-closed' }) uploadDialogClosedEmitter: EventEmitter<void>;

  async componentWillLoad() {
    this.os = await usePodOS(this.el);
  }

  private hideUploadDialog = async () => {
    await this.os.fetch(this.container.uri);
    this.uploadDialogClosedEmitter.emit();
  };

  render() {
    return (
      <sl-dialog label="Upload file" open onSl-after-hide={this.hideUploadDialog} style={{ '--body-spacing': '0' }}>
        <pos-upload
          accept={null}
          uploader={file => this.os.files().createNewFile(this.container, file)}
        ></pos-upload>
      </sl-dialog>
    );
  }
}
