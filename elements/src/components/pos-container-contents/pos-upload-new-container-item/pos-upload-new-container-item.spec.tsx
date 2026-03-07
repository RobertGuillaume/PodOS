import { PodOS } from '@pod-os/core';

jest.mock('../../events/usePodOS');
jest.mock('@shoelace-style/shoelace/dist/components/dialog/dialog.js', () => ({}));

import { newSpecPage } from '@stencil/core/testing';
import { PosUploadNewContainerItem } from './pos-upload-new-container-item';
import { usePodOS } from '../../events/usePodOS';
import { when } from 'jest-when';

import { mockPodOS } from '../../../test/mockPodOS';
import { fireEvent } from '@testing-library/dom';

describe ('pos-upload-new-container-item', () => {
  let os: PodOS;
  beforeEach(() => {
    os = mockPodOS();
    when(usePodOS).mockResolvedValue(os);
  });

  it('renders upload dialog', async () => {
    const page = await newSpecPage({
      components: [PosUploadNewContainerItem],
      html: `<pos-upload-new-container-item></pos-upload-new-container-item>`,
      supportsShadowDom: false,
    });

    expect(page.root).toEqualHtml(`
      <pos-upload-new-container-item>
        <sl-dialog label="Upload file" open style="--body-spacing: 0;">
          <pos-upload></pos-upload>
        </sl-dialog>
      </pos-upload-new-container-item>
    `);
  });
  it('emits event when upload dialog is closed', async () => {
    const page = await newSpecPage({
      components: [PosUploadNewContainerItem],
      html: `<pos-upload-new-container-item></pos-upload-new-container-item>`,
      supportsShadowDom: false,
    });
    page.rootInstance.container = { uri: 'https://pod.test/container/' };

    const uploadDialogClosedHandler = jest.fn();
    page.root?.addEventListener('pod-os:upload-dialog-closed', uploadDialogClosedHandler);

    const dialog = page.root?.querySelector('sl-dialog') as HTMLElement;
    fireEvent(dialog, new CustomEvent('sl-after-hide'));
    await page.waitForChanges();

    expect(os.fetch).toHaveBeenCalledWith('https://pod.test/container/');
    expect(uploadDialogClosedHandler).toHaveBeenCalled();
  });
  it('emits event when upload is done', async () => {
    const page = await newSpecPage({
      components: [PosUploadNewContainerItem],
      html: `<pos-upload-new-container-item></pos-upload-new-container-item>`,
      supportsShadowDom: false,
    });
    page.rootInstance.container = { uri: 'https://pod.test/container/' };

    const uploadDialogClosedHandler = jest.fn();
    page.root?.addEventListener('pod-os:upload-dialog-closed', uploadDialogClosedHandler);

    const upload = page.root?.querySelector('pos-upload') as HTMLElement;
    fireEvent(upload, new CustomEvent('pod-os:upload-done'));
    await page.waitForChanges();

    expect(os.fetch).toHaveBeenCalledWith('https://pod.test/container/');
    expect(uploadDialogClosedHandler).toHaveBeenCalled();
  });
  it('emits event when upload is cancelled', async () => {
    const page = await newSpecPage({
      components: [PosUploadNewContainerItem],
      html: `<pos-upload-new-container-item></pos-upload-new-container-item>`,
      supportsShadowDom: false,
    });
    page.rootInstance.container = { uri: 'https://pod.test/container/' };

    const uploadDialogClosedHandler = jest.fn();
    page.root?.addEventListener('pod-os:upload-dialog-closed', uploadDialogClosedHandler);

    const upload = page.root?.querySelector('pos-upload') as HTMLElement;
    fireEvent(upload, new CustomEvent('pod-os:upload-cancel'));
    await page.waitForChanges();

    expect(os.fetch).toHaveBeenCalledWith('https://pod.test/container/');
    expect(uploadDialogClosedHandler).toHaveBeenCalled();
  });
});
