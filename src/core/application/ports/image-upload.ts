import { Result } from "neverthrow";

type Props = {
  file: File;
  onProgress?: (event: ProgressEvent) => void;
};

export interface ImageUploadPort {
  upload(
    props: Props,
  ): Promise<
    Result<{ fileId: string; fileName: string; fileUrl: string }, string>
  >;
}
