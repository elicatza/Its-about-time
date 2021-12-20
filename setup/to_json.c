#include <json-c/json.h>
#include <stdio.h>
#include <string.h>
/* Good Example: https://gist.github.com/alan-mushi/19546a0e2c6bd4e059fd */


#define BUFFER_SIZE 0xFF
#define LINES_COUNT 208


int main() {
    struct json_object *root = json_object_new_object();
    struct json_object *timezones = json_object_new_array_ext(LINES_COUNT);
    struct json_object *timezone;


    struct {
        FILE* fp;
        const char* path_name;
        const char* mode;
        const char* key;
    } files[] = {
        { NULL, "dest/timezone_abbr.txt", "r", "name" },
        { NULL, "dest/timezone_name.txt", "r", "abbreviation" },
        { NULL, "dest/timezone_offs.txt", "r", "offset" },
        { NULL, NULL, NULL, NULL }
    };

    uint8_t i, j;
    for (i = 0; files[i].path_name != NULL; ++i) {
        files[i].fp = fopen(files[i].path_name, files[i].mode);

        if (files[i].fp == NULL) {
            fprintf(stderr, "ERROR: Unable to open file '%s'\n", files[i].path_name);
            return 1;
        }
    }


    char buffer[BUFFER_SIZE];
    for (j = 0; j < LINES_COUNT; ++j) {
        timezone = json_object_new_object();
        for (i = 0; files[i].fp != NULL; ++i) {
            if ((fgets(buffer, BUFFER_SIZE, files[i].fp)) == NULL) {
                fprintf(stderr, "ERROR: Unable to read from file '%s'\n", files[i].path_name);
                return 1;
            }

            char *tmp = strstr(buffer, "\n");
            if (tmp == NULL) {
                printf("Could not find newline char\n");
                return 1;
            }
            strncpy(tmp, "\0", 1);

            json_object_object_add(timezone, files[i].key, json_object_new_string(buffer));
        }

        json_object_array_add(timezones, timezone);
    }


    json_object_object_add(root, "timezones", timezones);

    FILE* dest_fp = fopen("./dest/timezones.json", "w+");
    if (dest_fp == NULL) {
        fprintf(stderr, "ERROR: Unable to open file");
        return 1;
    }
    fprintf(dest_fp, "%s", json_object_to_json_string_ext(root, JSON_C_TO_STRING_PRETTY | JSON_C_TO_STRING_SPACED));

    /* Exit program */

    json_object_put(root);
    json_object_put(timezones);
    json_object_put(timezone); /* Delete json object */

    for (i = 0; files[i].fp != NULL; ++i) {
        fclose(files[i].fp);
    }

    if (dest_fp == NULL) {
        fclose(dest_fp);
    }


    return 0;
}
