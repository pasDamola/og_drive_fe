<template>
  <v-container grid-list-md class="my-drive">
    <p class="font-weight-medium body-2">
      Folders
    </p>
    <div class="files mb-5">
      <Folder folder-name="Football" class="my-2" />
      <Folder folder-name="Wrestling" class="my-2" />
      <Folder folder-name="Basketball" class="my-2" />
      <Folder folder-name="Golf" class="my-2" />
      <Folder folder-name="Rugby" class="my-2" />
      <Folder folder-name="Volleyball" class="my-2" />
      <Folder folder-name="Tennis" class="my-2" />
    </div>
    <p class="font-weight-medium body-2">
      Files
    </p>
    <div class="files mb-5">
      <File
        format="xls"
        name="Letter of appreciation"
        :last-edited="tempDate.toISOString()"
        class="my-2"
      />
      <File
        format="pdf"
        name="Letter of appreciation"
        :last-edited="tempDate.toISOString()"
        class="my-2"
      />
      <File
        format="docx"
        name="Letter of appreciation"
        :last-edited="tempDate.toISOString()"
        class="my-2"
      />
      <File
        format="xls"
        name="Letter of appreciation"
        :last-edited="tempDate.toISOString()"
        class="my-2"
      />
      <File
        format="docx"
        name="Letter of appreciation"
        :last-edited="tempDate.toISOString()"
        class="my-2"
      />
      <File
        format="xls"
        name="Letter of appreciation"
        :last-edited="tempDate.toISOString()"
        class="my-2"
      />
      <File
        format="pdf"
        name="Letter of appreciation"
        :last-edited="tempDate.toISOString()"
        class="my-2"
      />
      <File
        format="docx"
        name="Letter of appreciation"
        :last-edited="tempDate.toISOString()"
        class="my-2"
      />
      <File
        format="pptx"
        name="Letter of appreciation"
        :last-edited="tempDate.toISOString()"
        class="my-2"
      />
      <File
        format="xls"
        name="Letter of appreciation"
        :last-edited="tempDate.toISOString()"
        class="my-2"
      />
      <File
        format="pdf"
        name="Letter of appreciation"
        :last-edited="tempDate.toISOString()"
        class="my-2"
      />
    </div>
  </v-container>
</template>

<script>
import File from '@/components/File';
import Folder from '@/components/Folder';

export default {
  layout: 'drive',
  components: { File, Folder },
  data: () => ({
    tempDate: new Date(2020, 3, 22),
  }),
};
</script>

<style lang="scss" scoped>
.my-drive {
  padding: 20px;
  max-height: 100%;
  overflow-y: auto;
}

.files {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(215px, 1fr));
}
</style>
