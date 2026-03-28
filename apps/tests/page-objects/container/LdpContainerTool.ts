import { Page } from "@playwright/test";
import { ContainerToolbar } from "./ContainerToolbar";
import { ContainerContents } from "./ContainerContents";
import { FileUpload } from "../FileUpload";

export class LdpContainerTool {
  readonly toolbar: ContainerToolbar;
  readonly contents: ContainerContents;
  readonly fileUpload: FileUpload;

  constructor(private page: Page) {
    this.toolbar = new ContainerToolbar(page);
    this.contents = new ContainerContents(page);
    this.fileUpload = new FileUpload(page);
  }

  async createNewFile(newFile: string) {
    await this.toolbar.newFileButton().click();
    await this.contents.submitNewFile(newFile);
  }

  async createNewFolder(folderName: string) {
    await this.toolbar.newFolderButton().click();
    await this.contents.submitNewFolder(folderName);
  }

  async uploadFile(filePath: string) {
    await this.toolbar.uploadFileButton().click();
    await this.fileUpload.selectAndUploadFile(filePath);
    await this.contents.closeUploadDialog();
  }
}
