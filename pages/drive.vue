<template>
  <v-container grid-list-md>
    <p class="font-weight-medium">
      Folders
    </p>
    <p class="font-weight-medium">
      Files
    </p>
    <div class="files">
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

export default {
  layout: 'drive',
  components: { File },
  data: () => ({
    tempDate: new Date(2020, 3, 22),
  }),
};
</script>

<style lang="scss" scoped>
.files {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(215px, 1fr));
}
</style>
