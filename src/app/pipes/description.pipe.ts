import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'description'
})
export class DescriptionPipe implements PipeTransform {

  // @see https://github.com/component/regexps/blob/master/index.js#L3 matches urls
  // eslint-disable-next-line max-len
  private urlPattern = /((http(?:s?):\/\/|~\/|\/)(?:\w+:\w+@)?((?:(?:[-\w\d{1-3}]+\.)+(?:com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|edu|co\.uk|ac\.uk|it|fr|tv|museum|asia|local|travel|[a-z]{2}))|((\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)(\.(\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)){3}))(?::[\d]{1,5})?(?:(?:(?:\/(?:[-\w~!$+|.,=]|%[a-f\d]{2})+)+|\/)+|\?|#)?(?:(?:\?(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)(?:&(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)*)*(?:#(?:[-\w~!$ |\/.,*:;=]|%[a-f\d]{2})*)?)/gi;
  private regex = new RegExp(this.urlPattern);

  // @see https://github.com/danrevah/ngx-pipes/blob/master/src/pipes/string/strip-tags.ts
  private stripTags(text: string, allowedTags: string[]) {
    return allowedTags.length > 0
      ? text.replace(new RegExp(`<(?!\/?(${allowedTags.join('|')})\s*\/?)[^>]+>`, 'g'), '')
      : text.replace(/<(?:.|\s)*?>/g, '');
  }

  /**
   * Replace all <a href="XXX">YYY</a> tags with YYY XXX
   * Make sure the href and title of possible anchor tags survive the strip tags process
   */
  private replaceAnchorTags(text: string) {
    return text.replace(/<a([^>]*)href\s*=\s*"([^"]*)"([^>]*)>([^<]*)<\/a>/ig, '$4 $2'); // $4 = Desciption $2 = href
  }

  /**
   * Strip all tags and replace urls with anchor tags that open on target _blank => kinda safe html
   */
  transform(value: string, ...allowedTags: string[]): any {
    // noinspection HtmlUnknownTarget
    return !value ? '' : this.stripTags(this.replaceAnchorTags(value), allowedTags)
      .replace(this.regex, '<a href="$1" target="_blank">$1</a>');
  }

}
