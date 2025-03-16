export const slugify = (str: any) => {
    return str
      .toLowerCase() 
      .replace(/\s+/g, '-') 
      .replace(/[^\w\-]+/g, '') 
      .replace(/\-\-+/g, '-') 
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };